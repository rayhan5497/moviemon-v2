export default function DevPanel() {
  return (
    <>
      <button
        className="fixed z-1000 left-12 px-4 py-2 text-primary bg-accent rounded text-xs cursor-pointer"
        onClick={() => {
          localStorage.clear();
          console.log(localStorage);
        }}
      >
        Clear All Storage
      </button>
      <button
        className="fixed z-1000 left-70 px-4 py-2 text-primary bg-accent rounded text-xs cursor-pointer"
        onClick={() => console.log(localStorage)}
      >
        Show All Storage
      </button>
    </>
  );
}
