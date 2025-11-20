export default function loading({ loading }: { loading: string }) {
  return (
    <div className="h-screen">
      <div className="absolute top-1/2 flex flex-col items-center justify-center w-full">
        {loading}
        <div className="relative w-[70px] h-[70px] rounded-full">
          <div className="absolute border-4 border-(--secondary-blue) rounded-full w-full h-full border-l-transparent animate-[rotate_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"></div>
          <div className="absolute border-4 border-(--secondary-blue) rounded-full w-[35px] h-[35px] translate-x-[17.5px] translate-y-[17.5px] border-t-transparent animate-[rotate-reverse_1s_cubic-bezier(0.15,0.61,0.58,0.4)_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
