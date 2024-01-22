import { useEffect, useState } from "react";
import { ResponseTeam } from "./types/team.types";
import { ResponsePlayer } from "./types/player.types";


function App() {  
  const apiUrl = import.meta.env.VITE_API_URL;
   const [teams, setTeams] = useState<ResponseTeam>();
   const [players, setPlayers] = useState<ResponsePlayer>();
  useEffect(() => {
    fetch(`${apiUrl}/get-all-teams`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      setTeams(data);
    })
    .catch((err) => {
      console.log(err.message);
    })

    fetch(`${apiUrl}/get-all-palyers`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      setPlayers(data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  }, [apiUrl]);
  
  return (
    <>
      <div className="bg-[#0f0f0f] h-[100vh] flex justify-evenly">
        <div className="text-[#ffffff] text-md">
          {teams?.data.map((team) => (
            <div key={team.id}>
              <p>{team.teamName}</p>
            </div>
          ))}
        </div>
        <div className="text-[#ffffff] text-md">
          {players?.data.map((player) => (
            <div key={player.id}>
              <p>{player.playerName}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
