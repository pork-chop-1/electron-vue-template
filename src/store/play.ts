import { Song, SongType } from '@/api/Song';
import { generateShuffledArray } from '@/utils/ArrayUtils';
import { defineStore } from 'pinia';

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
  randomIndex: number[]
}

export const usePlay = defineStore('play', {
  state: (): PlayStateType => ({
    songPlaneOpened: false,
    playing: false,
    currentSongIndex: -1,
    songList: [],
    playMode: 'cycle',
    currentTime: 0,
    volume: 0,
    // used in random play
    randomIndex: [],
  }),
  getters: {
    songInfo(state) {
      if(state.currentSongIndex !== -1) {
        if(this.playMode === 'random') {
          return state.songList[state.randomIndex[state.currentSongIndex]]
        } else {
          return state.songList[state.currentSongIndex]
        }
      } else {
        return null
      }
    }
  },
  actions: {
    /**
     * 直接切换当前播放
     */
    setCurrentIndex(index: number) {
      this.currentSongIndex = index
    },
    togglePlane() {
      this.songPlaneOpened = !this.songPlaneOpened
    },
    setPlaneStatus(open: boolean) {
      this.songPlaneOpened = open
    },
    /**
     * 根据歌曲id，切换歌单当前播放
     */
    setSongId(id: number) {
      for(let i = 0; i < this.songList.length; i++) {
        if (this.songList[i].id === id) {
          this.currentSongIndex = i
          break
        }
      }
    },
    /**
     * 根据歌曲id获取歌曲播放url
     */
    async getSongUrl (id?: number) {
      if(id != null) {
        return await Song.url(id)
      }
      if(this.currentSongIndex != null) {
        return await Song.url(this.songList[this.currentSongIndex].id)
      } else {
        return null
      }
    },
    /**
     * 完全重设歌单
     */
    setSongList(list: SongType[]) {
      this.songList = list
      this.randomIndex = generateShuffledArray(0, this.songList.length)
    },
    /**
     * 切换下一曲
     */
    nextSong() {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songList.length
      this.playing = true
    },
    /**
     * 切上一曲
     */
    prevSong() {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songList.length) % this.songList.length

      this.playing = true
    },
    /**
     * 播放完成后的行为
     */
    playCompleted() {
      if(this.playMode !== 'single') {
        this.nextSong()
      }
    },
    /**
     * 切换播放状态
     */
    togglePlaying() {
      this.playing = !this.playing
    },
    /**
     * 切换播放模式
     */
    togglePlayMode() {
      const playModes: (typeof this.playMode)[] = ['cycle', 'single', 'random']
      
      this.playMode = playModes[(playModes.indexOf(this.playMode) + 1) % 3]
      if(this.playMode === 'random') {
        this.randomIndex = generateShuffledArray(0, this.songList.length)
      }
    },
    insertSong(newSong: SongType) {
      this.songList.splice(this.currentSongIndex, 0, newSong)
      this.currentSongIndex += 1
    }
  },
  persist: true
});

export default usePlay;
