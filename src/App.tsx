import { useEffect, useState } from "react";
import { ResponseTeams, ResponseTeam } from "./types/team.types";
import { ResponsePlayers, ResponsePlayer, Player } from "./types/player.types";


function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [teams, setTeams] = useState<ResponseTeams | undefined>();
  const [team, setTeam] = useState<ResponseTeam | undefined>();
  const [players, setPlayers] = useState<ResponsePlayers | undefined>();
  const [player, setPlayer] = useState<ResponsePlayer | undefined>();
  const [team_Id, setTeam_Id] = useState<number | undefined>();
  const [player_Id, setPlayer_Id] = useState<number | undefined>();
  const [playing11, setPlaying11] = useState<Player[]>([]);
  const [yourTeam, setYourTeam] = useState<Player[]>([]);

  const getIdAndSendTeam = (id: number | undefined) => {
    setTeam_Id(id);
  };

  const getIdAndSendPlayer = (id: number | undefined) => {
    setPlayer_Id(id);
  };

  useEffect(() => {
    // get all teams in the DB
    fetch(`${apiUrl}/get-all-teams`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTeams(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // get all players in the DB
    fetch(`${apiUrl}/get-all-palyers`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setPlayers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [apiUrl]);

  useEffect(() => {
    // get one team from the DB
    if (team_Id !== undefined) {
      fetch(`${apiUrl}/team/${team_Id}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setTeam(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [apiUrl, team_Id]);

  useEffect(() => {
    // get one player from the DB
    if (player_Id !== undefined) {
      fetch(`${apiUrl}/get-player/${player_Id}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setPlayer(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [apiUrl, player_Id]);

  console.log("your team" , yourTeam);
  

  return (
    <>
      <div className="bg-[#0f0f0f] h-[200vh] flex justify-evenly">
        <div className="text-[#ffffff] text-md">
          <h3 className="text-lg text-[#adadad]">GET ALL TEAMS</h3>
          {teams?.data.map((t) => (
            <div key={t.id}>
              <button onClick={() => getIdAndSendTeam(t.id)}>{t.id}. {t.teamName}</button>
            </div>
          )) ?? []}
        </div>
        <div>
          <div className="text-[#ffffff] text-md">
            <h3 className="text-lg text-[#adadad]">GET ALL PLAYERS</h3>
            {players?.data.map((p) => (
              <div key={p.id}>
                <button className="mx-4 mt-1" onClick={() => getIdAndSendPlayer(p.id)}>{p.id}. {p.playerName}</button>
                {
                  yourTeam.includes(p) ?
                  null
                : <button className="bg-[#9f9f9f] mx-4 rounded-md" onClick={() => {
                    if ((!yourTeam) || (yourTeam && yourTeam.length < 25)) {
                      setYourTeam([...yourTeam, p]);
                    }
                  }}>Add in your team</button>
                }
                {
                  playing11.includes(p) ?
                  null
                : <button className="bg-[#9f9f9f] mx-4 rounded-md" onClick={() => {
                    if ((!playing11) || (playing11 && playing11.length < 11)) {
                      setPlaying11([...playing11, p]);
                    }
                  }}>Add in playing 11</button>
                }
              </div>
            )) ?? []}
          </div>
          <button className="bg-[#2ddd30] mx-4 rounded-md text-white p-2 m-1">Save</button>
          <button className="bg-[#ff2121] mx-4 rounded-md text-white p-2 m-1">Cancel</button>
        </div>
        <div className="text-[#ffffff] text-md">
          <h3 className="text-lg text-[#adadad]">GET ONE TEAM</h3>
          {
            team?.data ? (
              <div>
                <p>{team?.data.teamName}</p>
              </div>
            ) : (
              <p>No team data available</p>
            )
          }
        </div>
        <div className="text-[#ffffff] text-md">
          <h3 className="text-lg text-[#adadad]">GET ONE PLAYER</h3>
          {
            player?.data ? (
              <div>
                <p>{player?.data.playerName}</p>
              </div>
            ) : (
              <p>No player data available</p>
            )
          }
        </div>
        <div className="text-[#ffffff] text-md">
          <h3 className="text-lg text-[#adadad]">Your Selected Team</h3>
          {yourTeam.map((team) => (
            <div key={team.id}>
              <button>{team.id}. {team.playerName}</button>
            </div>
          )) ?? []}
        </div>
        <div className="text-[#ffffff] text-md">
          <h3 className="text-lg text-[#adadad]">Playing 11</h3>
          {playing11.map((team) => (
            <div key={team.id}>
              <button>{team.id}. {team.playerName}</button>
            </div>
          )) ?? []}
        </div>
      </div>
    </>
  );
}

export default App;
