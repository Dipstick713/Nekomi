# Nekomi
Nekomi is a collaborative playlist creation platform that allows users to create, share, and vote on songs together using Spotify integration.

![](https://github.com/Dipstick713/Nekomi/blob/main/public/preview.gif)

## Features

- **Collaborative Playlist Creation**: Create playlists and invite friends to contribute songs
- **Democratic Song Selection**: Vote on songs to collectively decide what makes it to the playlist
- **Spotify Integration**: Seamlessly search and add songs from Spotify's vast library
- **Real-time Updates**: See changes and votes in real-time
- **Leaderboard System**: Track top contributors and most popular songs (Coming Soon!)

## Tech Stack

- **Frontend**: [Nuxt 3](https://nuxt.com/) - Vue.js Framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Backend**: [Supabase](https://supabase.com/) - Open source Firebase alternative
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Open source relational database
- **Authentication**: Spotify OAuth via Supabase


# Getting Started

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Spotify Developer account (for Spotify API integration)

## Installation
1.  Clone the repository:
```
git clone https://github.com/Dipstick713/Nekomi.git
cd your-repo-name
```

2.  Install dependencies:
```
npm  install
```

3.  Run the development server:
Create a `.env` file in the root directory with the following variables:

```
SUPABASE_URL='YOUR_SUPABASE_URL'
SUPABASE_KEY='YOUR_SUPABASE_KEY'
SPOTIFY_CLIENT_ID='YOUR_SPOTIFY_CLIENT_ID'
SPOTIFY_CLIENT_SECRET='YOUR_SPOTIFY_CLIENT_SECRET'
```

## Supabase Setup

1.  **Create a Supabase Project**:
    
    -   Go to  [Supabase](https://supabase.io/)  and create a new project.
        
    -   Get your  `SUPABASE_URL`  and  `SUPABASE_KEY`  from the project settings.
        
2.  **Set Up Database Tables**:
    
    -   Create the following tables in your Supabase project:
        
         -   `users`: Stores user details.
        
        -   `songs`: Stores song details.
            
        -   `votes`: Tracks user votes for songs.
            
        -   `playlists`: Stores playlist details.
            
        -   `members`: Tracks playlist members.
            
![](https://github.com/Dipstick713/Nekomi/blob/main/public/schema.png)

3.  **Enable Authentication**:
    
    -   Set up authentication in Supabase and configure it in your Nuxt app.
    
## Spotify API Integration
- Create a Spotify Developer Account:
- Go to the Spotify Developer Dashboard and create a new app.
- Get your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.
- Set Up Spotify API:
	- Use the Spotify API to 
        - get user data.
		- get access and refresh tokens.
		- fetch song details and integrate them into your app.

# Acknowledgments
- [Nuxt.js](https://nuxt.com) Nuxt.js for the awesome framework.
- [Supabase](https://supabase.io/)  for the backend and database.
- [Spotify API](https://developer.spotify.com/) for song integration.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
