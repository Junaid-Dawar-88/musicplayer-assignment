/**
 * Flight Reservation System
 * A Node.js application for managing flight reservations using Inquirer.js
 */
import inquirer from "inquirer";

const songs = [];
const playLists = [];
let songId = 1;

async function main() {
  console.log("\n" + "=".repeat(40));
  console.log("    🎵 WELCOME TO MUSIC PLAYER �");
  console.log("=".repeat(40));
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        { name: "🎫  Song Management", value: "create" },
        { name: "📋  Playlist Management", value: "playList" },
        { name: "✏️   View Library", value: "view" },
        { name: "🗑️   Exit Application", value: "cancel" },
      ],
    },
  ]);

  switch (choice) {
    case "create":
      await songManagement();
      break;
    case "playList":
      await playListManagement();
      break;
    case "view":
      await viewLabrary();
      break;
    case "exit":
      console.log("\n👋 Thank you for using Flight Reservation System!");
      process.exit(0);
  }
}

async function songManagement() {
  console.log("\n========== SONG MANAGEMENT ==========\n");
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        { name: "🎫  Add new song", value: "add" },
        { name: "📋  View all song", value: "view" },
        { name: "✏️  Play song", value: "play" },
        { name: "🗑️  Back to main menu", value: "back" },
      ],
    },
  ]);

  switch (choice) {
    case "add":
      await addSongs();
      break;
    case "view":
      await viewSongs();
      break;
    case "play":
      await playSong();
      break;
    case "back":
      await main();
      break;
  }
}

async function addSongs() {
  const { title } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter song title: ",
      validate: (input) => (input.trim() ? true : "Title cannot be empty"),
    },
  ]);
  const { artistName } = await inquirer.prompt([
    {
      type: "input",
      name: "artistName",
      message: "Enter artist name: ",
      validate: (input) =>
        input.trim() ? true : "Artist name cannot be empty",
    },
  ]);
  const { filePath } = await inquirer.prompt([
    {
      type: "input",
      name: "filePath",
      message: "Enter file path: ",
      validate: (input) => (input.trim() ? true : "File path cannot be empty"),
    },
  ]);
  const { duration } = await inquirer.prompt([
    {
      type: "input",
      name: "duration",
      message: "Enter duration (optional, press Enter to skip): ",
      validate: (input) => {
        if (input.trim() === "") {
          return true;
        } else if (!isNaN(input)) {
          return true;
        } else {
          return "Please enter a valid number";
        }
      },
    },
  ]);

  let songTime = Number(duration);
  console.log(`Song "${title}" by ${artistName} added successfully!`);
  songs.push({ id: `S00${songId++}`, title, artistName, filePath, songTime });
  // console.log(addSong);
  songManagement();
}
async function viewSongs() {
  console.log(`Tilte  |  Artist  |  Path  |  Time :`);
  console.log("------------------------------------------");
  songs.forEach((song) => {
    console.log(
      `${song.title} | ${song.artistName} | ${song.filePath} | ${song.songTime}`
    );
  });
  songManagement();
}
async function playSong() {
  console.log("\n========== PLAY SONG ==========");
  if (songs.length === 0) {
    console.log("  No songs available to play.");
    return main();
  }
  const { selectedSong } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedSong",
      message: "Select a song to play:",
      choices: songs.map((song, index) => ({
        name: `${song.title} by ${song.artistName}`,
        value: index,
      })),
    },
  ]);
  const song = songs[selectedSong];
  const playTime = song.songTime || 5000;
  console.log(`🎵 Now playing: "${song.title}" by ${song.artistName}...`);
  await new Promise((resolve) => setTimeout(resolve, playTime));
  console.log("✅ Finished playing.");
  songManagement();
}

async function playListManagement() {
  console.log("\n========== SONG MANAGEMENT ==========\n");
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        { name: "🎫  Create New Playlist", value: "create" },
        { name: "📋  Add Song to Playlist", value: "add" },
        { name: "✏️  View All Playlists", value: "view" },
        { name: "✏️  View Playlist Contents", value: "viewAll" },
        { name: "🗑️  Back to main menu", value: "back" },
      ],
    },
  ]);

  switch (choice) {
    case "create":
      await createPlayList();
      break;
    case "add":
      await addSongToPlayList();
      break;
    case "view":
      await viewAllPlayList();
      break;
    case "viewAll":
      await viewPlayListContent();
      break;
    case "back":
      await main();
      break;
  }
}

async function createPlayList() {
  console.log("\n--- CREATE NEW PLAYLIST ---");
  const { Plist } = await inquirer.prompt([
    {
      type: "input",
      name: "Plist",
      message: "Enter Playlist name: ",
      validate: (input) => (input.trim() ? true : "playList cannot be empty"),
    },
  ]);
  playLists.push({ PlayList: Plist, songs: [] });
  console.log(playLists);
  playListManagement();
}

async function addSongToPlayList() {
  console.log("\n--- ADD SONG TO PLAYLIST ---");
  if (playLists.length === 0) {
    console.log(" No playlists available.");
    return main();
  }
  const { selectedPlayList } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedPlayList",
      message: "Select a playlist:",
      choices: playLists.map((Playlist, index) => ({
        name: Playlist.Plist,
        value: index,
      })),
    },
  ]);
  if (songs.length === 0) {
    console.log(" No songs available to add.");
    return main();
  }
  const { selectedSong } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedSong",
      message: "Select a song to add to the playlist:",
      choices: songs.map((song, index) => ({
        name: `${song.id}`,
        value: index,
      })),
    },
  ]);
  playLists[selectedPlayList].songs.push(songs[selectedSong]);
  console.log(
    `✅Song: added "${songs[selectedSong].title}" to playlist "${playLists[selectedPlayList].Plist}".`
  );
  playListManagement();
}

async function viewAllPlayList() {
  console.log("\n---- VIEW ALL PLAYLIST ----");
  playLists.forEach((list) => {
    console.log(`playList: ${list.PlayList}`);
  });
  playListManagement();
}

async function viewPlayListContent() {
  console.log("--- VIEW PLAYLIST CONTENTS ---");
  playLists.forEach((C) => {
    console.log(` ${C.PlayList}(${C.songs.length} songs)`);
  });
  playListManagement()
}

async function viewLabrary() {
  console.log("\n------ SONGS LIBRARY------");
  songs.forEach((S) => {
    console.log(`${S.title}-${S.artistName}(${S.songTime})`);
  });
  console.log(`Total songs: ${songs.length}`);

  console.log("\n------ PLAYLIST LIBRARY------");
  playLists.forEach((C) => {
    console.log(` ${C.PlayList}(${C.songs.length} songs)`);
  });
  console.log(`Total playList: ${playLists.length}`);
  playListManagement()
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n\n👋 Goodbye!");
  process.exit(0);
});

// Start the application
main().catch(console.error);
