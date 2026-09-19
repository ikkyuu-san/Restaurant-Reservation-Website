const dishes = [
  {
    name: 'Charred Hokkaido Scallop',
    description: 'Cauliflower silk, brown butter, finger lime',
    price: '฿ 680',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'Ember-Roasted Duck',
    description: 'Sour cherry, smoked beetroot, jus gras',
    price: '฿ 1,280',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'Valrhona Chocolate',
    description: 'Miso caramel, hazelnut, sea salt ice cream',
    price: '฿ 480',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85',
  },
]

function FeaturedDishes() {
  return (
    <section className="dishes-section section-wrap" id="menu">
      <div className="dishes-heading">
        <div>
          <div className="section-kicker">From the kitchen</div>
          <h2>Signature <em>flavours.</em></h2>
        </div>
        <p className="dishes-intro">A glimpse of what awaits at the table.</p>
      </div>

      <div className="dish-grid">
        {dishes.map((dish, index) => (
          <article className="dish-card" key={dish.name}>
            <div className="dish-image-wrap">
              <img className="dish-image" src={dish.image} alt={dish.name} />
              <span className="dish-index">0{index + 1}</span>
            </div>
            <div className="dish-details">
              <div>
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
              </div>
              <span className="dish-price">{dish.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeaturedDishes
