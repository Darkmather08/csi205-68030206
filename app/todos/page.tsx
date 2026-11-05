"use client";
import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { useEffect, useState } from "react";
import { Badge } from "@/components/tailgrids/core/badge";
import "bootstrap-icons/font/bootstrap-icons.css";
import { fetchTodos } from "@/data/todos";
import type { TodoType } from "@/data/todos";
import { Spinner } from "@/components/tailgrids/core/spinner";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";
import { checkLogin } from "@/utils/login";
import { useRouter } from "next/dist/client/components/navigation";
export default function Todos() {
  const router = useRouter();
    useEffect(() => checkLogin(router, "/todos"), [router]);
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [onlyWaiting, setOnlyWaiting] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  
  useEffect(()=>{
    const _todoRawStr = localStorage.getItem('todosRaw')
    if (_todoRawStr === null){
      // setTodosRaw([])
      fetchTodos()
      .then((data) => setTodosRaw(data as TodoType[]))
      .catch((error) => setTodosRaw([]))
      .finally(() => setIsLoading(false));
    }else{
      setTodosRaw(JSON.parse(_todoRawStr)as TodoType[]) 
    }
    setIsLoading(false)
  },[])
  useEffect(()=>{
    localStorage.setItem('todosRaw', JSON.stringify(todosRaw))
  },[todosRaw])
  const [showDialog, setShowDialog] = useState<boolean>(false);
  // onload
  // useEffect(() => {
  //   
  // }, []);
  // todoRaw, onlyWaiting => [] => todos
  useEffect(() => {
    // bypass to todos (fixed later)
    onlyWaiting
      ? setTodos(todosRaw.filter((todo) => todo.completed === false))
      : setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]);
  // itemsPerPage => [] => totalPages
  useEffect(() => {
    // reset current page to 1 when itemsPerPage changes
    setTotalPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);
  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage <= 0) setCurrentPage(1);
      else if (currentPage > totalPages) setCurrentPage(totalPages);
    }
  }, [totalPages]);
  const deleteTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };
  const makeDone = (id: number) => {
    const selected = todosRaw.find((todo) => {
      return todo.id === id;
    });
    selected!.completed = true;
    setTodosRaw([...todosRaw]);
  };
  const addTodo = () => {
    const idDom = document.getElementById("id") as HTMLInputElement
    const titleDom = document.getElementById("title") as HTMLInputElement
    const titleStr = titleDom.value.trim()
    if (titleStr === '') return
    const newTodo: TodoType = { userId: 1, id: Number(idDom.value), title: titleDom.value.trim(),completed: false}
      setTodosRaw([...todosRaw, newTodo])
    };
  const cancelAddTodo = () => {};
  return (
    // todos container
    <>
      <div className="w-[600px] mx-auto">
        {/* controller */}
        <div className="flex justify-between">
          {/* toggle */}
          <Toggle
            label="Show only"
            checked={onlyWaiting}
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <Badge className="bg-yellow-400 text-black rounded-lg text-[0.8rem] pl-2 pr-2 py-1">
            Waiting<i className="bi bi-clock"></i>
          </Badge>
          {/* dropdown */}
          <div className="pl-60 pr-1 text-sm">
            <NativeSelect
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-2 pr-9 text-sm"
              placeholder="Select an option"
            >
              <NativeSelectOption value="5">
                5 items per page
              </NativeSelectOption>
              <NativeSelectOption value="10">
                10 items per page
              </NativeSelectOption>
              <NativeSelectOption value="50">
                50 items per page
              </NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
      </div>
      {/* table */}
      <div className="mt-2 w-2/3 mx-auto">
        <TableRoot>
          <TableHeader>
            <TableRow className="bg-black text-white">
              <TableHead className="text-left" scope="col">
                ID
              </TableHead>
              <TableHead className="text-center" scope="col">
                Title
              </TableHead>
              <TableHead className="text-right" scope="col">
                Completed
                <button
                  type="button"
                  aria-label="Add todo"
                  className="ml-2 inline-flex h-7 w-8 items-center justify-center rounded-lg bg-blue-400 text-[0.8rem] text-white"
                  onClick={() => setShowDialog(true)}
                >
                  <i className="bi bi-plus" aria-hidden="true"></i>
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* show spinner when loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && todos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-red-500">
                  No data, may be connection refused (reload again)
                </TableCell>
              </TableRow>
            )}
            {/* render data */}

            {todos
              .filter((todo) => {
                const lower = (currentPage - 1) * itemsPerPage + 1;
                const upper = currentPage * itemsPerPage;
                return todo.id >= lower && todo.id <= upper;
              })
              .map((todo) => {
                return (
                  /* completed = false */
                  <TableRow key={todo.id}>
                    <TableCell className="text-left">
                      <Badge className="bg-gray-600 rounded-lg text-[0.8rem] px-2 py-1 text-white">
                        {todo.id}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">{todo.title}</TableCell>
                    <TableCell className="text-right flex">
                      {todo.completed ? (
                        <button>
                          <Badge className="bg-green-400 text-white rounded-lg text-[0.8rem] px-2 py-1">
                            Completed<i className="bi bi-check-circle"></i>
                          </Badge>
                        </button>
                      ) : (
                        <button onClick={() => makeDone(todo.id)}>
                          <Badge className="bg-yellow-400 text-white rounded-lg text-[0.8rem] px-2 py-1">
                            Waiting<i className="bi bi-clock"></i>
                          </Badge>
                        </button>
                      )}

                      <button onClick={() => deleteTodo(todo.id)}>
                        <Badge className="bg-red-400 text-white rounded-lg text-[0.8rem] px-2 py-1 ml-2">
                          <i className="bi bi-trash"></i>
                        </Badge>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}

            {/* completed = true */}
            {/* <TableRow>
              <TableCell className="text-left">
                <Badge className="bg-gray-600 rounded-lg text-[0.8rem] px-2 py-1 text-white">
                  1
                </Badge>
              </TableCell>
              <TableCell className="text-center">Title</TableCell>
              <TableCell className="text-right">
                <button>
                  <Badge className="bg-green-400 text-white rounded-lg text-[0.8rem] px-2 py-1">
                    Completed<i className="bi bi-check-circle"></i>
                  </Badge>
                </button>
                <button>
                  <Badge className="bg-red-400 text-white rounded-lg text-[0.8rem] px-2 py-1 ml-2">
                    <i className="bi bi-trash"></i>
                  </Badge>
                </button>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </TableRoot>
      </div>
      {/* pagination */}

      {todos.length > 0 && (
        <div className="mt-2 w-2/3 mx-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      <Backdrop isOpen={showDialog} onOpenChange={setShowDialog}>
        <Dialog>
          <DialogHeader>
            <DialogTitle className="flex">
              <p className="bg-blue-100 rounded-md size={32}"> + </p> Add todo
            </DialogTitle>
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">ID (Auto)</Label>
                <Input
                  className="w-full pointer-events-none bg-gray-100 text-gray-400"
                  value={
                    todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1
                  }
                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label>Title</Label>
                <Input
                  autoFocus
                  placeholder="ใส่งานที่ต้องการเพิ่ม"
                  className="w-full"
                  id="title"
                />
              </TextField>
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose appearance="outline" onClick={() => cancelAddTodo()}>
              Cancel
            </DialogClose>
            <DialogClose onClick={() => addTodo()}>Add todo</DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop>
    </>
  )
}
