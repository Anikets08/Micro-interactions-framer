import {
  stagger,
  useAnimate,
  motion,
  AnimatePresence,
  useAnimationControls,
} from "framer-motion";
import { useState } from "react";

function App() {
  let [todos, setTodos] = useState([
    {
      id: 1,
      title: "Learn React",
      done: true,
    },
    {
      id: 2,
      title: "Learn Tailwind",
      done: true,
    },
    {
      id: 3,
      title: "Learn Firebase",
      done: false,
    },
    {
      id: 4,
      title: "Learn Next.js",
      done: false,
    },
    {
      id: 5,
      title: "Learn GraphQL",
      done: false,
    },
    {
      id: 6,
      title: "Learn TypeScript",
      done: true,
    },
    {
      id: 7,
      title: "Learn Node.js",
      done: false,
    },
    {
      id: 8,
      title: "Learn MongoDB",
      done: true,
    },
  ]);
  let [ref, animate] = useAnimate();
  let [animationSide, setAnimationSide] = useState(0);

  function handleClick({ todo }) {
    const newTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          done: !t.done,
        };
      }
      return t;
    });
    setTodos(newTodos);
    if (newTodos.every((i) => i.done)) {
      let lastCompleted = todos.findIndex((i) => !i.done);

      // bounce
      animate(
        "input",
        {
          opacity: [1, 0.5, 1],
          scale: [1, 3, 1],
          rotate: [0, -60, 60, 0],
          accentColor: "green",
        },
        {
          duration: 0.45,
          delay: stagger(0.05, { from: lastCompleted }),
        }
      );
    } else {
      animate(
        "input",
        {
          accentColor: "",
          opacity: [1, 0.8, 1],
        },
        {
          duration: 0.35,
        }
      );
    }
  }

  function handelDelete({ todo }) {
    let newTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(newTodos);
  }

  return (
    <div className="h-screen w-full flex flex-col  overflow-hidden lg:flex-row">
      <div className="w-full bg-blu min-h-[200px] h-3/6 flex flex-col items-center justify-center gap-2 lg:w-1/2 lg:h-full lg:gap-8">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-10 h-10 lg:w-20 lg:h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>
        </div>
        <div className="flex flex-col w-full items-center p-2 gap-2">
          <h1 className="font-bold text-white text-2xl text-center lg:text-4xl">
            Epic Todo
          </h1>
          <h3 className="font-normal text-white text-md px-8 text-center lg:text-xl">
            A Todo app you haven't experienced before
          </h3>
        </div>
      </div>

      <div
        className="w-full flex my-8 flex-col bg-white h-full items-center overflow-y-auto overflow-x-hidden justify-start px-6 transition-all duration-500 ease-in-out lg:w-1/2 lg:px-20 lg:justify-center "
        ref={ref}
      >
        <AnimatePresence>
          {todos.map((todo, index) => (
            <motion.div
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
              key={todo.id}
              initial={{ opacity: 0, y: -10, x: 0 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                duration: animationSide === 1 ? 0.2 : 0.35,
                delay: index * 0.08,
              }}
              exit={{
                opacity: 0,
                y: animationSide === 1 ? 0 : -10,
                x: animationSide === 1 ? -200 : 0,
              }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -150) {
                  setAnimationSide(1);
                  setTimeout(() => {
                    handelDelete({ todo });
                  }, 20);
                } else if (info.offset.x > 150) {
                  setAnimationSide(0);
                  handleClick({ todo });
                } else {
                  setAnimationSide(0);
                }
              }}
              className={`flex items-center justify-between w-full gap-5 p-2 hover:bg-slate-100 `}
            >
              <input
                type="checkbox"
                className={`form-checkbox h-5 w-5  transition duration-150 ease-in-out rounded-3xl`}
                value={todo.done}
                checked={todo.done}
                onChange={() => handleClick({ todo })}
              />
              <p
                className={`w-full text-sm ${
                  todo.done ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </p>
              <Spacer />
              <svg
                onClick={() => {
                  handelDelete({ todo });
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 rounded-full hover:stroke-red-500 cursor-pointer transition duration-150 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

function Spacer() {
  return <div className="w-full" />;
}
