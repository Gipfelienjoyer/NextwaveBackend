import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Get all users with their appointments and todo lists
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user_Table.findMany ({
      include: {
        Appointments: true,
        ToDo_Lists: {
          include: {
            ToDo_Items: true,
          },
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

// Create a new user
app.post('/users', async (req: Request, res: Response) => {
  const { Email } = req.body;
  try {
    const newUser = await prisma.user_Table.create({
      data: {
        Email,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a new user.' });
  }
});

// Update a user's email
app.put('/users/:userId', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const { Email } = req.body;
  try {
    const updatedUser = await prisma.user_Table.update({
      where: { User_ID: userId },
      data: { Email },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});

// Get all appointments
app.get('/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching appointments.' });
  }
});

// Create a new appointment
app.post('/appointments', async (req: Request, res: Response) => {
  const { User_ID, Appointments_Title, Appointments_Description, Appointments_Start_Date, Appointments_Finish_Date } = req.body;
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        User_ID,
        Appointments_Title,
        Appointments_Description,
        Appointments_Start_Date,
        Appointments_Finish_Date,
      },
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a new appointment.' });
  }
});

// Update an appointment
app.put('/appointments/:appointmentId', async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.appointmentId);
  const { Appointments_Title, Appointments_Description } = req.body;
  try {
    const updatedAppointment = await prisma.appointment.update({
      where: { Appointments_ID: appointmentId },
      data: { Appointments_Title, Appointments_Description },
    });
    res.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the appointment.' });
  }
});

// Get all todo lists
app.get('/todo-lists', async (req: Request, res: Response) => {
  try {
    const todoLists = await prisma.toDo_List.findMany();
    res.json(todoLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching todo lists.' });
  }
});

// Create a new todo list
app.post('/todo-lists', async (req: Request, res: Response) => {
  const { User_ID, ToDo_List_Title, ToDo_List_Desc } = req.body;
  try {
    const newToDoList = await prisma.toDo_List.create({
      data: {
        User_ID,
        ToDo_List_Title,
        ToDo_List_Desc,
      },
    });
    res.status(201).json(newToDoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a new todo list.' });
  }
});

// Update a todo list
app.put('/todo-lists/:todoListId', async (req: Request, res: Response) => {
  const todoListId = parseInt(req.params.todoListId);
  const { ToDo_List_Title, ToDo_List_Desc } = req.body;
  try {
    const updatedToDoList = await prisma.toDo_List.update({
      where: { ToDo_List_ID: todoListId },
      data: { ToDo_List_Title, ToDo_List_Desc },
    });
    res.json(updatedToDoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the todo list.' });
  }
});

// Get all todo items
app.get('/todo-items', async (req: Request, res: Response) => {
  try {
    const todoItems = await prisma.toDo_Item.findMany();
    res.json(todoItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching todo items.' });
  }
});

// Create a new todo item
app.post('/todo-items', async (req: Request, res: Response) => {
  const { ToDo_List_ID, ToDo_Item_Title, ToDo_Item_Description, ToDo_Item_Status, ToDo_Item_Due_Date } = req.body;
  try {
    const newToDoItem = await prisma.toDo_Item.create({
      data: {
        ToDo_List_ID,
        ToDo_Item_Title,
        ToDo_Item_Description,
        ToDo_Item_Status,
        ToDo_Item_Due_Date,
      },
    });
    res.status(201).json(newToDoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a new todo item.' });
  }
});

// Update a todo item
app.put('/todo-items/:todoItemId', async (req: Request, res: Response) => {
  const todoItemId = parseInt(req.params.todoItemId);
  const { ToDo_Item_Title, ToDo_Item_Description, ToDo_Item_Status, ToDo_Item_Due_Date } = req.body;
  try {
    const updatedToDoItem = await prisma.toDo_Item.update({
      where: { ToDo_Item_ID: todoItemId },
      data: { ToDo_Item_Title, ToDo_Item_Description, ToDo_Item_Status, ToDo_Item_Due_Date },
    });
    res.json(updatedToDoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the todo item.' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
