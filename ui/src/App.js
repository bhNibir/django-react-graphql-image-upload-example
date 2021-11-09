import './App.css';
import { useQuery, gql } from '@apollo/client';
import UploadFile from './components/UploadFile';

function App() {
  const { loading, error, data } = useQuery(All_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data.allUsers.map(({avatar})=> console.log(avatar)))

  return (
    <div className="App">
      <UploadFile/>
    {
      data.allUsers.map(({id, name, avatar}) =>
      <div key={id}>
        <p>{name}</p>
        <pre>{avatar}</pre>
      </div>
      )
    } 
    </div>
  );
}

const All_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      name
    }
  }
`;


export default App;


