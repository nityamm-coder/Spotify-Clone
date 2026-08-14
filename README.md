# 🎵 Spotify Clone

A web-based music player application that mimics Spotify's interface and core functionality. This project allows users to browse, play, and manage music from various playlists.

## ✨ Features

- **Music Playback**: Play, pause, and control music playback
- **Playlist Management**: Browse and select from multiple music playlists
- **Dynamic Playlists**: 
  - Breathless
  - Classic
  - Dance Music
  - Devotional
  - Emotional
  - Prime Bollywood
  - Rap
  - Yo Yo Honey Singh
- **Responsive Design**: Works seamlessly on different screen sizes
- **User-Friendly Interface**: Intuitive navigation and controls
- **Song Information**: Display song metadata from JSON files

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Styling with custom utilities
- **JavaScript**: Dynamic functionality and interactivity
- **JSON**: Song metadata storage

## 📁 Project Structure

```
Spotify_Clone/
├── index.html          # Main HTML file
├── script.js           # JavaScript logic
├── style.css           # Main stylesheet
├── utility.css         # Utility CSS classes
├── img/                # Images and assets
└── songs/              # Music playlists directory
    ├── Breathless/
    ├── Classic/
    ├── Dance Music/
    ├── Devotional/
    ├── Emotional/
    ├── Prime Bollywood/
    ├── Rap/
    └── Yo Yo Honey Singh/
        └── info.json   # Song metadata
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required

### Installation

1. Clone or download the repository
   ```bash
   git clone <repository-url>
   cd Spotify_Clone
   ```

2. Open the project
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance:
     ```bash
     python -m http.server 8000
     # or
     npx http-server
     ```

3. Navigate to `http://localhost:8000` in your browser

## 📖 How to Use

1. **Browse Playlists**: Select a playlist from the sidebar
2. **Play Music**: Click on any song to start playing
3. **Controls**: Use the player controls to:
   - Play/Pause
   - Next/Previous track
   - Seek through the song
   - Adjust volume

## 🎨 Customization

### Adding New Playlists

1. Create a new folder in `songs/` directory with your playlist name
2. Add an `info.json` file with song metadata:
   ```json
   {
    "title": "playlist_name",
    "description": "playlist_description"
    }
   ```
3. Add songs of your choice in that playlist (.mp3 only)


## 🔧 Features to Implement

- [ ] Search functionality
- [ ] Favorites/Likes system
- [ ] Progress bar seeking
- [ ] Keyboard shortcuts
- [ ] Dark/Light theme toggle
- [ ] Audio visualization

## 🐛 Troubleshooting

### Songs not playing
- Ensure audio files exist in the song folders
- Check browser console for errors (F12)
- Verify JSON files have correct formatting


## 📄 License

This project is open source and available under the MIT License.


## 🤝 Contributing

Feel free to fork this project, make improvements, and submit pull requests!

# **Coding Today! Engineering Tomorrow!** <br>
Made By- Nityam Mishra <br>
Email: nityamm2005@gmail.com <br>
GitHub: [nityamm-coder](https://github.com/nityamm-coder)
Linkedin: [nityam_mishra](https://www.linkedin.com/in/nityam2005/)
