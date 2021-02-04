import http from '../_http'

const baseUrl = 'http://localhost:12001/MyCommunity'

const myCommunityService = {
  getForumInfo: () => {
    return http.post(baseUrl + '/GetForumInfo')
  },
}

export default myCommunityService
