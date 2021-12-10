import Community from "../models/Community";
import User from "../models/User";
import UserCommunity from "../models/UserCommunity";
import ErrorResponse from "../models/ErrorResponse";

const makeUrl = (path = "/") => {
  const host = process.env.DB_SERVER || "localhost";
  const defaultUrl = `http://${host}:8080`;
  return `${defaultUrl}${path}`;
};

class API {
  async createCommunity(community: Community): Promise<Community|ErrorResponse> {
    return fetch(makeUrl(`/communities`), {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify(community)
    })
      .then(res => res.json())
  }

  async getFollowedCommunities(userId: string): Promise<Community[]|ErrorResponse> {
    const res = await fetch(
      makeUrl(`/users/${userId}/communities`)
    )
    if (res.ok) return res.json();
    else {
      console.error({res});
      return new Promise(() => []);
    }
  }

  async followCommunity(communityId: string, userId: string): Promise<UserCommunity|ErrorResponse> {
    return fetch(
      makeUrl(`communities/${communityId}/followers`), {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
          id: userId || 1,
        })
      }).then(res => res.json());
  }

  async unFollowCommunity(communityId: string, userId: string): Promise<UserCommunity|ErrorResponse> {
    return fetch(
      makeUrl(`communities/${communityId}/followers`), {
        method: "DELETE",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
          id: userId || 1,
        })
      }).then(res => res.json());
  }

  async createNewUser(userName: string): Promise<User|ErrorResponse> {
    const res = await fetch(makeUrl('/users'), {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({ name: userName }),
    })
    return res.json()
  }

  async getCommunityPage(communityId: string):Promise<Community|ErrorResponse> {
    const res = await fetch(
      makeUrl(`/communities/${communityId}`), {
        method: "GET",
        headers: [["Content-Type", "application/json"]],
      })
    return res.json()
  }

  async getCommunitiesFollowers(communityId: String): Promise<User[]|ErrorResponse> {
      const res = await fetch(
        makeUrl(`communities/${communityId}/followers`)
      )
      if (res.ok) return res.json();
      else {
        console.error({res});
        return new Promise(() => []);
      }
  }

}

export default new API();
