import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);

  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchShelf();
  }, []);

  const saveItem = e => {

    e.preventDefault();

    axios.post('/api/shelf', {
      description: description,
      image_url: imageUrl,
    }).then(response => {
      setDescription('');
      setImageUrl('');
      fetchShelf();
    }).catch(error => {
      console.error(error);
      alert('Something went wrong.');
    });


  };

  const deleteItem = (e, id) => {

    e.preventDefault();

    axios.delete(`/api/shelf/${id}`)
      .then(response => {
        fetchShelf();
      })
      .catch(error => {
        console.error(error);
        alert('Something went wrong.');
      });

  };

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>

      {/* Form allowing user to add items to the shelf */}
      <div>
        <h3>Add item to shelf:</h3>

        <form onSubmit={saveItem}>

          <label htmlFor='item-name'>Item name:</label>
          <input value={description} onChange={e => setDescription(e.target.value)} id='item-name' placeholder='Notebooks' />

          <label htmlFor='image-url'>Image URL:</label>
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} id='image-url' />

          <button type='submit'>Submit</button>

        </form>

      </div>

      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
            <div className="gallery">
              <img src={item.image_url} alt={item.description} />
              <br />
              <div className="desc">{item.description}</div>
              <div style={{ textAlign: 'center', padding: '5px' }}>
                <button onClick={e => deleteItem(e, item.id)} style={{ cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
