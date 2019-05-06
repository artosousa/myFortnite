import React, {Component, Fragment} from 'react';
import './player-data.css';

export default class PlayerData extends Component {
  state = {
    userData: {}
    
  };

  fetchUserData = e => {
    // do fetch here, set userData state to the returned data like you did with the storage app
    e.preventDefault();
    const baseUrl = 'https://fortnite-public-api.theapinetwork.com/prod09/users';
    const username = e.target.username.value;
    const url = `${baseUrl}/id?username=${username}`;

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        const userId = data.uid;
        const newUrl = `${baseUrl}/public/br_stats_v2?user_id=${userId}`;
        return fetch(newUrl);
      })
      .then(resp => resp.json())
      .then(data => {
        this.setState({userData: data.overallData.defaultModes});
        console.log(data);
      })
      .catch(function(error) {
        console.log('request failed', error);
      });
  }
  
  render() {
    const matches = this.state.userData.matchesplayed;
    const totalKills = this.state.userData.kills;
    const matchesWon = this.state.userData.placetop1;
    return (
      <Fragment>
        <form onSubmit={this.fetchUserData} id="form">
            <input type="text" placeholder="enter epic username" title="username" name="username" id="epic-username" autoFocus/>
            <button id="user-submit" type="submit">GET STATS</button>
        </form>
        <div className="stat-card">
          <h2>{totalKills ? `Total PWNAGE! You've MUCKED ${totalKills} n00bs!` : `You're the n00b with 0 kills.`}</h2>
        </div>
        <div className="stat-card">
          <h2>{matches ? `You've gone to battle ${matches} times!` : 'No battle experience here.'}</h2>
        </div>
        <div className="stat-card">
          <h2>{matchesWon ? `The CHAMP is here ... about ${matchesWon} times over. ` : `You can do better than that! 0 matches won.`}</h2>
        </div>
      </Fragment>
    );
  }
}