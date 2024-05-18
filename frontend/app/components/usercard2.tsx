import Link from "next/link";

export default function UserCard2(props: any) {

    return (<>
 
        <div className="card bg-base-100 shadow-xl">
            {/* <figure><img src={'http://localhost:8000/admin/getimage/' + props.data.filename} width={400} /></figure> */}
            <div className="card-body">
                <h2 className="card-title">Party Name: {props.data.name}</h2>
                {/* Name:  {props.data.name} <br /> */}
                Leader:  {props.data.leader}<br />
                <div className="card-actions justify-end">
                
            <Link href={`/homepage/viewp/${props.data.name}`}>
              <button className="btn btn-primary">View More</button>
            </Link>
          </div>
                
            </div>
            </div>
            <br /><br />
    </>);

}