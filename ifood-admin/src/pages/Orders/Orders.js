import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statuses] = useState(["TRAITEMENT", "PREPARATION", "RECUPERATION", "EN_ROUTE"]);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  
  useEffect(() => {
    fetchOrders();
    fetchDeliveryPersons();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/commandes");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchDeliveryPersons = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/livreur");
      setDeliveryPersons(response.data);
    } catch (error) {
      console.error("Error fetching delivery persons:", error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const orderToUpdate = orders.find(order => order.id === orderId);
      const updatedOrder = { ...orderToUpdate, statut: newStatus };
      await axios.put(`http://localhost:8080/api/commandes/${orderId}`, updatedOrder);
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const createDelivery = async (orderId, deliveryPersonId, deliveryEstimation) => {
    try {
      const deliveryData = {
        livreurId: deliveryPersonId,
        tempsEstime: deliveryEstimation,
        commandesIds: [orderId],
      };
      await axios.post("http://localhost:8080/api/livraison", deliveryData);
      alert("Delivery created successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error creating delivery:", error);
      alert("Failed to create delivery.");
    }
  };

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Delivery Address</th>
            <th>Panier</th>
            <th>Delivery</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>{order.statut}</td>
              <td>{order.adresse_livraison}</td>
              <td>
                {order.panier?.panierMenuItemDtos.map(item => (
                  <div key={item.menuItem.id}>
                    {item.quantite} x {item.menuItem.nom}
                  </div>
                ))}
              </td>
              <td>
                {order.livraison ? (
                  <div>
                    <p>ID: {order.livraison.id}</p>
                    <p>Temps Estimé: {order.livraison.tempsEstime} mins</p>
                  </div>
                ) : (
                  <div>
                    <select
                      value={order.deliveryPersonId || ""}
                      onChange={(e) => order.deliveryPersonId = e.target.value}
                    >
                      <option value="">Select Delivery Person</option>
                      {deliveryPersons.map(person => (
                        <option key={person.id} value={person.id}>
                          {person.nom}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Estimated Time (mins)"
                      value={order.deliveryEstimation || ""}
                      onChange={(e) => order.deliveryEstimation = e.target.value}
                    />
                    <button onClick={() => createDelivery(order.id, order.deliveryPersonId, order.deliveryEstimation)}>
                      Create Delivery
                    </button>
                  </div>
                )}
              </td>
              <td>
                <select
                  value={order.statut}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
