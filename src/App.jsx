import { useEffect, useState } from "react";
import CarouselTemplate from "./Components/Carousel";
import { nanoid } from "nanoid";

export default function App() {
  const [cards, setCards] = useState([]);

  let localData = JSON.parse(localStorage.getItem("Cards")) ?? [];

  // 1st tym rerender p phle agr user ka data already hoga toh vo phle hi sync krlega
  useEffect(() => {
    setCards(localData);
  }, []); // enpty arr means on first tym mounting

  console.log("This is my", localData);

  // let isOpen = false;
  const [isOpen, setIsOpen] = useState(false); // state var

  function handleFormOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    //isOpen = false;
    setIsOpen(false);
  }

  function handleChecked(task_id) {
    setCards((prev) => prev.filter(({ id }) => id != task_id));
    localData = localData.filter(({ id }) => id != task_id);
    localStorage.setItem("Cards", JSON.stringify(localData));
  }

  function handleSubmit(cardData) {
    if(cardData.title.trim() == '' || cardData.description.trim() == ''){
        alert("Nothing Entered...")
        return
    } 
    setCards((prev) => [...prev, cardData]);
    localData.push(cardData);
    localStorage.setItem("Cards", JSON.stringify(localData));
  }

  // arr s map krna
  // const items = [1, 2, 3, 4];
  // const card = (
  //   <li className="TodoCard flex flex-col gap-4 p-4 max-w-1/3 min-w-[30%] flex-1 bg-amber-200 border-2 rounded-sm overflow-auto">
  //     <div className="flex justify-between items-center w-full">
  //       <span>Title</span>
  //       <input type="checkbox" />
  //     </div>
  //     <textarea className="border-2 rounded-sm p-4" rows="4">
  //       Sample Description....
  //     </textarea>
  //   </li>
  // );

  // const arr = items.map((element) => card);

  // return(
  //   <CustomizedTooltips/>
  // )

  return (
    <div className="App flex flex-col h-screen w-screen ">
      {isOpen ? (
        <Todofrom handleClose={handleClose} handleSubmit={handleSubmit} />
      ) : null}
      <header className=" p-2 h-[8%] flex items-center max-w-full  bg-purple-400 text-white  ">
        <img
          className="w-12 h-12 rounded-lg p-0"
          src="todo.png"
          alt="todo-logo"
        />
        <h1 className="left-0 font-bold text-2xl w-full text-center ">
          Todo List App
        </h1>
      </header>

      <main className="flex flex-col h-[92%]">

        <div className="w-full h-fit border-3 border-purple-700">
          <CarouselTemplate/>
        </div>

        <section className="flex flex-col h-full items-center bg-purple-300  gap-4 p-4 ">

          <button
            onClick={handleFormOpen}
            className="bg-purple-600 text-white  px-3 py-1 rounded-md cursor-pointer flex-wrap hover:bg-purple-800"
          >
            Add item
          </button>

          <ul className="flex bg-purple-300 justify-center flex-wrap gap-4 w-full max-w-full p-4">
            {cards.map(({ title, description, id }, index) => (
              <TodoCard key={index} title={title} description={description} task_id={id} index={index} handleChecked = {handleChecked} />
            ))}
          </ul>
        </section>

        {/* using _ is a common convention in JavaScript to indicate that you're not actually using the first argument (the card object itself) in the map callback. It makes code a little clearer. */}
      </main>
    </div>
  );

  // return (
  //   <div className="flex w-screen h-screen items-center justify-center">
  //     <div className="bg-red-400 sm:bg-blue-400 md:bg-green-400 text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl w-full text-center text-nowrap">Hello there its prince</div>
  //   </div>
  // );
}

function TodoCard({ title, description, index, task_id, handleChecked }) {
  return (
    <div className="flex flex-col gap-4 p-4 border-3 border-purple-700 rounded-sm  bg-purple-200 ">
      <div className="flex justify-between items-center w-full">
        <span className=" text-purple-900 font-medium">Task: {index}</span>
        <span>{title}</span>
        <input
          type="checkbox"
          checked={false}
          onChange={() => handleChecked(task_id)}
        />
      </div>
      <textarea
        disabled
        className="border-2 border-purple-700 text-purple-900 font-medium rounded-sm p-4"
        placeholder="Enter Description..."
        value={description}
      />
    </div>
  );
}

function Todofrom({ handleClose, handleSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div
      onClick={handleClose}
      className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-black/80"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ id: nanoid(), title, description });
          handleClose();
        }}
        className="bg-white h-fit flex flex-col gap-4 p-4  w-[85%] sm:w-[60%] md:w-[40%] lg:w-[30%] rounded-lg "
      >
        <label htmlFor="mai hu title ki id" className="font-bold">
          Title:
        </label>
        <input
          id="mai hu title ki id"
          type="text"
          className="rounded-md border p-1 px-2"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="m hu desc id" className="flex flex-col gap-2">
          <span className="font-bold">Description:</span>
          <textarea
            id="m hu desc id"
            rows="8"
            cols="2"
            className="rounded-md border p-1 px-2 "
            placeholder="Enter description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            // button ka type submit ...form ka onsubmit bnn jata h
            className="p-1 bg-purple-500 text-white px-2 rounded-md cursor-pointer"
          >
            Submit
          </button>
          <button
            type="button" // isliy yha button ka type button h
            onClick={handleClose}
            className="p-1 bg-purple-500 text-white px-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
