import { Song, SongType } from '@/api/Song';
import { defineStore } from 'pinia';

export const usePlay = defineStore('play', {
  state: (): {
    songPlaneOpened: boolean,
    songInfo: SongType
  } => ({
    songPlaneOpened: false,
    songInfo: {
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
      /** 歌曲时长 */
      dt: 0,
    }
  }),
  actions: {
    setSongInfo(song: SongType, open?: boolean) {
      this.songInfo = song
      if(open != null) {
        this.songPlaneOpened = open
      }
    },
    togglePlane() {
      this.songPlaneOpened = !this.songPlaneOpened
    },
    setPlaneStatus(open: boolean) {
      this.songPlaneOpened = open
    },
    async setSongId(id: string) {
      const res = await Song.detail(id)
      if (res.songs.length > 0) {
        this.songInfo = res.songs[0]
      }
    }
  }
});

export default usePlay;
