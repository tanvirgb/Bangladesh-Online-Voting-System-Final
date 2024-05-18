import Link from 'next/link';

export default function UserCard(props: any) {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
          Name:  {props.data.name} <br />
          </h2>
          Position: {props.data.position}
          <br />
          Location: {props.data.election_location}
          <br />
          <div className="card-actions justify-end">
            <Link href={`/homepage/view/${props.data.name}`}>
              <button className="btn btn-primary">View More</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
