import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import "../../styles/view.css";

import hallService from "../../services/hall.service";

export default function Halls() {
  const [halls, setHalls] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    hallService.getAllHalls().then((res) => {
      setHalls(res.data);
    });
  }, []);

  return (
    <>
      <div className="viewContainer">
        <Alert variant="secondary">
          {/* get text on the center */}
          <h4 style={{ textAlign: "center" }}>Wedding Halls</h4>
        </Alert>

        {/* Search bar */}
        <div className="searchBar">
          <input
            style={{
              width: "100%",
              height: "2rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "5px",
              fontSize: "16px",
            }}
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="viewContainerInner">
          {halls
            .filter((item) => {
              if (search == "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => (
              <a href={`/hallOne/${item.id}`} className="content">
                <Card style={{ width: "18rem", margin: "10px" }}>
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ height: "10rem" }}
                  />
                  <Card.Body>
                    <Card.Title style={{ height: "1rem" }}>
                      {item.name}
                    </Card.Title>
                    <br />
                    <Card.Title style={{ height: "2rem" }}>
                      {item.type}
                    </Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ height: "3rem" }}>
                      Capacity : {item.capacity}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ height: "3rem" }}>
                      Price: Rs. {item.price.toFixed(2)}
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ height: "3rem" }}>
                      <Button variant="primary">View Hall</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </a>
            ))}
        </div>
      </div>
      <br />
    </>
  );
}
