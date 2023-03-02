import { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";

interface Item {
  label: string;
  done: boolean;
}

export const App = () => {
  const [items, setItems] = useState<Item[]>([
    { label: "Item 1", done: true },
    { label: "Item 2", done: false },
  ]);
  const [newItem, setNewItem] = useState<string>("");
  const toggleItem = (idx: number) =>
    setItems(items.map((item, i) => (i == idx ? { ...item, done: !item.done } : item)));
  const deleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const addItem = () => {
    setItems([...items, { label: newItem, done: false }]);
    setNewItem("");
  };
  return (
    <>
      <ListGroup>
        {items.map((item, index) => (
          <ListGroup.Item key={index}>
            {item.label} {item.done ? "✅" : "❌"}
            <Button onClick={() => toggleItem(index)}>Toggle</Button>
            <Button
              variant="danger"
              onClick={() => deleteItem(index)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form.Group>
        <Form.Label>Item</Form.Label>
        <Form.Control
          type="text"
          value={newItem}
          onChange={(x) => setNewItem(x.target.value)}
        />
      </Form.Group>
      <Button
        onClick={addItem}
        disabled={newItem == ""}
      >
        Add
      </Button>
    </>
  );
};
