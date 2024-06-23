import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentUser,
  setDeleteToDo,
  setEditToDo,
  setTodo,
} from "../store/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);

  const [task, setTask] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  return (
    <div>
      <input type="text" onChange={() => setTask(event.target.value)} />
      <button
        type="button"
        onClick={() => {
          dispatch(setTodo({ currentUser: currentUser?.email, task: task }));
          setTask(null);
        }}
      >
        Add
      </button>
      {currentUser?.todo?.map((item, index) => {
        return (
          <div key={index}>
            {editIndex === index ? (
              <input
                type="text"
                value={editData}
                onChange={(event) => setEditData(event.target.value)}
              />
            ) : (
              <span>{item}</span>
            )}
            {editIndex === index ? (
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    setEditToDo({
                      currentUser: currentUser?.email,
                      editData,
                      index,
                    })
                  );
                  setEditIndex(null);
                  setEditData(null);
                }}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setEditIndex(index);
                  setEditData(item);
                }}
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                dispatch(
                  setDeleteToDo({
                    currentUser: currentUser?.email,
                    item,
                  })
                );
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          navigate("/login");
          dispatch(setCurrentUser(null));
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
