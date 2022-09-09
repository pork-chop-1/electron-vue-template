import { request } from "@/utils/request";
import { ArtistType } from "../Artist";

export type PersonalFMType = {
  "name": string,
  "id": number,
  "position": number,
  "alias": string[],
  "status": number,
  "fee": number,
  "copyrightId": number,
  "disc": string,
  "no": number,
  "artists": ArtistType[],
  "album": {
      "name": string,
      "id": number,
      "type": string,
      "size": number,
      "picId": number,
      "blurPicUrl": string,
      "companyId": number,
      "pic": number,
      "picUrl": string,
      "publishTime": number,
      "description": string,
      "tags": string,
      "briefDesc": string,
      "songs": [],
      "alias": string[],
      "status": 1,
      "copyrightId": number,
      "commentThreadId": string,
      "subType": "录音室版",
      "transName": null,
      "mark": number,
  },
  "starred": false,
  "popularity": 85,
  "score": 85,
  "starredNum": 0,
  "duration": 280273,
  "playedNum": 0,
  "dayPlays": 0,
  "hearTime": 0,
  "sqMusic": null,
  "hrMusic": null,
  "ringtone": "",
  "crbt": null,
  "audition": null,
  "copyFrom": "",
  "commentThreadId": "R_SO_4_1459428236",
  "rtUrl": null,
  "ftype": 0,
  "rtUrls": [],
  "copyright": 1,
  "transName": null,
  "sign": null,
  "mark": 0,
  "originCoverType": 0,
  "originSongSimpleData": null,
  "single": 0,
  "noCopyrightRcmd": null,
  "rtype": 0,
  "rurl": null,
  "mvid": 0,
  "reason": "",
  "alg": "alg_fm_red_i2i"
}

export function getPersonalFM() {
  return request<{
    code: number,
    data: PersonalFMType,
    popAdjust: boolean
  }>({
    url: '/personal_fm',
    method: 'GET',
    params: {
      timestamp: Date.now()
    }
  })
}