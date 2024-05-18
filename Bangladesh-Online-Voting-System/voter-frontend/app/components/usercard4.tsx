import Link from 'next/link';

export default function UserCard4(props: any) {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        {/* <figure><img src={'http://localhost:8000/admin/getimage/' + props.data.filename} width={400} /></figure> */}
        <div className="card-body">
          <h2 className="card-title">
            Inforamtion
          </h2>
          Name:  {props.data.name} <br />
          Position: {props.data.position}
          <br />
          Location: {props.data.election_location}
          <br />
          <div className="card-actions justify-end">
            <Link href={`/homepage/votes/${props.data.id}`}>
              <button className="btn btn-primary"> Vote </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
