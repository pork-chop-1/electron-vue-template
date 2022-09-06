import { Song, SongType } from '@/api/Song';
import { defineStore } from 'pinia';
import StoragePlugin from './StoragePlugin';

/*
{
      name: '',
      id: -1,
      alia: [],
      al: {
        id: -1,
        name: '',
        picUrl: '',
        tns: [],
      },
      ar: [{
        name: '',
        id: -1
      }],
      // 歌曲时长 
      dt: 0,
    }
*/

export type PlayStateType = {
  songPlaneOpened: boolean,
  currentSongIndex: number,
  playing: boolean,
  songList: SongType[],
  playMode: 'cycle' | 'single' | 'random',
  currentTime: number,
  volume: number,
}

export const usePlay = defineStore('play', {
  state: (): PlayStateType => ({
    songPlaneOpened: false,
    playing: false,
    currentSongIndex: -1,
    songList: [],
    playMode: 'cycle',
    currentTime: 0,
    volume: 0
  }),
  getters: {
    songInfo(state) {
      if(state.currentSongIndex !== -1) {
        return state.songList[state.currentSongIndex]
      } else {
        return null
      }
    }
  },
  actions: {
    setCurrentIndex(index: number) {
      this.currentSongIndex = index
    },
    togglePlane() {
      this.songPlaneOpened = !this.songPlaneOpened
    },
    setPlaneStatus(open: boolean) {
      this.songPlaneOpened = open
    },
    setSongId(id: number) {
      for(let i = 0; i < this.songList.length; i++) {
        if (this.songList[i].id === id) {
          this.currentSongIndex = i
          break
        }
      }
    },
    async getSongUrl (id: number) {
      if(this.currentSongIndex != null) {
        return await Song.url(this.songList[this.currentSongIndex].id)
      } else {
        return null
      }
    },
    setSongList(list: SongType[]) {
      this.songList = list
    },
    nextSong() {
      if(this.playMode === 'cycle' || this.playMode === 'single') {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songList.length
      } else {
        // todo random
      }
    },
    prevSong() {
      if(this.playMode === 'cycle' || this.playMode === 'single') {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.songList.length) % this.songList.length
      } else {
        // todo random
      }
    },
    togglePlaying() {
      this.playing = !this.playing
    }
  },
  persist: true
});

export default usePlay;
