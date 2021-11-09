import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { GET_PHOTOS_QUERY } from './Files';

const SINGLE_UPLOAD_MUTATION = gql`
mutation CreateUserProfile(
    $name: String!,
    $avatar: Upload!,
  ){
    createUserProfile(name: $name, avatar: $avatar){
      userProfile{
        id
        name
        avatar
      }
    }  
    
  }
`;



const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [userName, setUserName] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [msg, setMsg] = useState('');
    const [uploadRequest, { loading, error }] = useMutation(
        SINGLE_UPLOAD_MUTATION
      );

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = async () => {
    setMsg('');
    if (!selectedFile) return;
    try {
      const res = await uploadRequest({
        variables: { "name": userName, "avatar":selectedFile },
        // refetchQueries: [{ query: GET_PHOTOS_QUERY }],
      });
      if (res.data) {
        setMsg('File upload!');
        setSelectedFile(null);
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
    console.log(selectedFile);
    console.log(userName);
        
	};

	return(
   <div>
            <input type="text" name="name"  placeholder="Inter Your name" onChange={(e) => setUserName( e.target.value)} />
            <br />
            <br />
            <br />

			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}

export default UploadFile

