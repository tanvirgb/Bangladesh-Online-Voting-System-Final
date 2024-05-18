// export default function UserCard3(props: any) {

//     return (<>
 
//         <div className="card bg-base-100 shadow-xl">
//             {/* <figure><img src={'http://localhost:8000/admin/getimage/' + props.data.filename} width={400} /></figure> */}
//             <div className="card-body">
//                 <h2 className="card-title">Profile</h2>
//                 Name: {props.data.name}<br/>
//                 Address: {props.data.address}<br/>
//                 Contact: {props.data.contact}<br/>
//                 Email: {props.data.email}<br/>
//                 Gender: {props.data.gender}<br/>
//                 Religion: {props.data.religion}<br/>
//                 NID: {props.data.nid}<br/>
//                 Username: {props.data.username}<br/>
//                 <div className="card-actions justify-end">
                
//                 </div>
//             </div>
//             </div>
//             <br /><br />
//     </>);

// }
// UserCard3.tsx
import React from 'react';

interface Props {
  data: any; // Update the type according to your JSON structure
}

const UserCard3: React.FC<Props> = ({ data }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
         <div className="card-body">
      <h2 className="card-title">Profile</h2>
      {/* Render the values from the data object */}
      <p>Name: {data.name}</p>
      <p>Address: {data.address}</p>
      <p>Contact: {data.contact}</p>
      <p>Email: {data.email}</p>
      <p>Gender: {data.gender}</p>
      <p>Religion: {data.religion}</p>
      <p>NID: {data.nid}</p>
      <p>Username: {data.username}</p>
    </div>
    </div>
  );
};

export default UserCard3;
