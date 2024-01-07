import { useEffect, useState } from "react";

type Coach = {
  name: string;
  experience: number;
}

type Team = {
  id: number;
  teamName: string;
  ownerName: string;
  coach: Coach;
  netWorth: number;
}

type ResponseTeam = {
  success: boolean;
  message: string;
  data: Team[];
}

function App() {
   const [teams, setTeams] = useState<ResponseTeam>();
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/get-all-teams")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      setTeams(data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  }, [])
  console.log(teams);
  
  return (
    <>
      <h1 className="bg-[#0f0f0f] h-[100vh] text-[#ffffff] text-xl">
        Hello world!
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
