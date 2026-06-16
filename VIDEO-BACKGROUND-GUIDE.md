# Hero Video Background Guide

## Current Setup
The hero section now has a video background with the following features:
- Autoplay, muted, and looping video
- Dark gradient overlay for text readability
- Fallback to static image if video fails to load
- Fully responsive design

## Using Your Own Video

### Option 1: Local Video File (Recommended for Production)
1. Place your video file in the `public` folder
   - Example: `public/hero-video.mp4`
   - Recommended format: MP4 (H.264 codec for best compatibility)
   - Recommended resolution: 1920x1080 (Full HD)
   - Keep file size under 10MB for faster loading

2. Update the video source in `src/app/pages/home/home.html`:
   ```html
   <video class="hero-video" autoplay muted loop playsinline>
     <source src="/hero-video.mp4" type="video/mp4">
   </video>
   ```

### Option 2: External Video URL
The current setup uses free stock videos from Coverr.co:
- https://cdn.coverr.co/videos/coverr-industrial-machinery-in-a-factory-7535/1080p.mp4
- https://cdn.coverr.co/videos/coverr-cnc-machine-working-7867/1080p.mp4

You can replace these with any other video URL.

### Option 3: Multiple Video Formats (Best Compatibility)
```html
<video class="hero-video" autoplay muted loop playsinline>
  <source src="/hero-video.webm" type="video/webm">
  <source src="/hero-video.mp4" type="video/mp4">
</video>
```

## Video Best Practices

### Technical Requirements:
- **Duration**: 10-30 seconds (loops seamlessly)
- **Resolution**: 1920x1080 or 1280x720
- **File Size**: 5-15MB (compressed)
- **Codec**: H.264 (MP4) or VP9 (WebM)
- **Aspect Ratio**: 16:9

### Optimization Tips:
1. Compress your video using tools like HandBrake or FFmpeg
2. Remove audio track (saves file size)
3. Reduce frame rate to 24-30 fps
4. Use a lower bitrate (3-5 Mbps for 1080p)

### Example FFmpeg Command:
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 28 -vf scale=1920:1080 -an -movflags +faststart output.mp4
```

## Free Stock Video Resources
- **Coverr**: https://coverr.co (free, no attribution required)
- **Pexels Videos**: https://www.pexels.com/videos
- **Pixabay**: https://pixabay.com/videos
- **Videvo**: https://www.videvo.net

## Troubleshooting

### Video Not Playing:
1. Check browser console for errors
2. Verify video file path is correct
3. Ensure video codec is supported (use MP4 with H.264)
4. Check that video file is accessible

### Performance Issues:
1. Reduce video file size (compress more)
2. Lower resolution to 1280x720
3. Consider using poster image for mobile devices
4. Add lazy loading for better initial page load

### Mobile Considerations:
- Some mobile browsers don't autoplay videos
- Consider showing static image on mobile (already handled in CSS)
- Test on actual devices, not just browser dev tools
