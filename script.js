document.getElementById('cropBtn').addEventListener('click', () => {
  const url = document.getElementById('ytUrl').value.trim();
  const start = document.getElementById('startTime').value.trim();
  const end = document.getElementById('endTime').value.trim();
  const videoContainer = document.getElementById('videoContainer');

  if (!url || !start || !end) {
    alert("Please fill all fields");
    return;
  }

  let videoId = "";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1);
    } else {
      videoId = urlObj.searchParams.get("v");
    }
  } catch (e) {
    alert("Invalid YouTube URL");
    return;
  }

  // Generate embed with start/end times
  const startSec = timeToSeconds(start);
  const endSec = timeToSeconds(end);
  
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startSec}&end=${endSec}&autoplay=1`;

  videoContainer.innerHTML = `
    <iframe 
      width="360" height="640" 
      src="${embedUrl}" 
      frameborder="0" 
      allowfullscreen>
    </iframe>
  `;
});

function timeToSeconds(t) {
  const parts = t.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}
