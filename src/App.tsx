import { useEffect, useState } from "react";
import { ResponseTeams, ResponseTeam } from "./types/team.types";
import { ResponsePlayers, ResponsePlayer } from "./types/player.types";


function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [teams, setTeams] = useState<ResponseTeams | undefined>();
  const [team, setTeam] = useState<ResponseTeam | undefined>();
  const [players, setPlayers] = useState<ResponsePlayers | undefined>();
  const [player, setPlayer] = useState<ResponsePlayer | undefined>();
  const [team_Id, setTeam_Id] = useState<number | undefined>();
  const [player_Id, setPlayer_Id] = useState<number | undefined>();

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

  return (
    <>
      <div className="bg-[#0f0f0f] h-[100vh] flex justify-evenly">
        <div className="text-[#ffffff] text-md">
          <h3 className="text-lg text-[#adadad]">GET ALL TEAMS</h3>
          {teams?.data.map((t) => (
            <div key={t.id}>
              <button onClick={() => getIdAndSendTeam(t.id)}>{t.id}. {t.teamName}</button>
            </div>
          ))}
        </div>
        <div className="text-[#ffffff] text-md">
          <h3 className="text-lg text-[#adadad]">GET ALL PLAYERS</h3>
          {players?.data.map((p) => (
            <div key={p.id}>
              <button onClick={() => getIdAndSendPlayer(p.id)}>{p.id}. {p.playerName}</button>
            </div>
          ))}
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
      </div>
    </>
  );
}

export default App;
