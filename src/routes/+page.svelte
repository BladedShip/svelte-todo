<script>
  import "../app.css";
  import { initializeApp, getApp, getApps } from "firebase/app";
  import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
  } from "firebase/firestore";
  import { firebaseConfig } from "$lib/firebaseConfig";
  import { browser } from "$app/environment";

  const firebaseApp =
    browser &&
    (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
  const db = browser && getFirestore();

  let todos = [];

  const colRef = browser && collection(db, "todos");

  const unsubscribe =
    browser &&
    onSnapshot(colRef, (querySnapshot) => {
      let fireTodos = [];
      querySnapshot.forEach((doc) => {
        let todo = { ...doc.data(), id: doc.id };
        fireTodos = [todo, ...fireTodos];
      });
      todos = fireTodos;
    });

  let task = "";
  let error = "";
  const addTodo = async () => {
    let todo = {
      task: task,
      isComplete: false,
      createdAt: new Date(),
    };
    if (task !== "") {
      const docRef = await addDoc(collection(db, "todos"), {
        task: task,
        isComplete: false,
        createdAt: new Date(),
      });
      error = "";
    } else {
      error = "Task is Empty";
    }
    task = "";
  };

  const markTodoAsComplete = async (item) => {
    await updateDoc(doc(db, "todos", item.id), {
      isComplete: !item.isComplete,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const enterPressed = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };
</script>

<div class="masterdiv">
  <span>
    <input type="text" placeholder="Add a new Task" bind:value={task} />
    <button on:click={addTodo} class="buttonBig">➕</button>
  </span>

  <ol>
    {#each todos as todo}
      <li>
        <span class:complete={todo.isComplete}>{todo.task}</span>
        <span>
          <button on:click={() => markTodoAsComplete(todo)} class="buttonSmall"
            >✔</button
          >
          <button on:click={() => deleteTodo(todo.id)} class="buttonSmall"
            >❌</button
          >
        </span>
      </li>
    {:else}
      <p>No Items in List</p>
    {/each}
    <p class:error>{error}</p>
  </ol>
</div>

<svelte:window on:keydown={enterPressed} />

<style>
  .complete {
    text-decoration: line-through;
  }
  .error {
    color: red;
  }
  .masterdiv {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .buttonBig {
    padding: 12px;
  }
  input {
    padding: 12px;
  }
</style>
