// Loading UI
export default function loading({ data }: { data: string }) {
  return (
    <div className="">
      loading {data}
      <div className="loader">
        {/* <div className="loader-outer"></div> */}
        <div className="loader-inner"></div>
      </div>
    </div>
  );
}
