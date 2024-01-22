import { useEffect, useState } from "react";
import { ResponseTeam } from "./types/team.types";


function App() {  
  const apiUrl = import.meta.env.VITE_API_URL;
   const [teams, setTeams] = useState<ResponseTeam>();
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
  }, [apiUrl]);
  
  return (
    <>
      <h1 className="bg-[#0f0f0f] h-[100vh] text-[#ffffff] text-xl">
        {teams?.data.map((team) => (
          <div key={team.id}>
            <p>{team.teamName}</p>
          </div>
        ))}
      </h1>
    </>
  )
}

export default App
