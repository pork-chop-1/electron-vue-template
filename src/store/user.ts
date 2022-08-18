import { defineStore } from 'pinia';
import { getAccount } from '@/api/User'

export const useUser = defineStore('user', {
  state: () => ({
    profile: {
      avatarUrl: "",
      backgroundUrl: "",
      birthday: 0,
      createTime: 0,
      nickname: "",
      userId: -1,
    },
    isDark: false,
  }),
  actions: {
    async getProfiles() {
      const res = await getAccount()
      if(res.profile != null) {
        this.profile = res.profile
      }
    }
  }
});

export default useUser;
