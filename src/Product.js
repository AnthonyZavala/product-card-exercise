import React from 'react';
import './Product.css';
import FavoriteIcon from '@material-ui/icons/Favorite'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Grid from '@material-ui/core/Grid'

const toImageUrl = (product) =>
  `//res.cloudinary.com/imperfect/image/upload/w_400,h_260,c_pad,b_auto,d_products:no-image-found.png/${product.imageFilename}`;

const Product = ({ product, isFavorite, setFavoriteCallback }) => {
  const [favoriteSelected, setFavoriteSelected] = React.useState(isFavorite);

  return (
    <div className="Product-card">
      <Grid container>
        <Grid item xs={12}>
          <img
            src={toImageUrl(product)}
            alt={product.name}
            style={{ maxWidth: '100%' }} // Dynamic image resizing
          />
        </Grid>
        <Grid item xs={9}>
          <div>
            {product.name}
          </div>
          <div>
            ${product.price} | {product.packageUnitAmount} {product.packageUnitFormatted}
          </div>
        </Grid>
        <Grid item xs={3}>
          <ToggleButton
            value="check"
            selected={favoriteSelected}
            onChange={() => {
              setFavoriteSelected(!favoriteSelected); // Update selected react state
              setFavoriteCallback(!favoriteSelected, product); // Callback to execute add or remove API command
            }}
          >
            <FavoriteIcon />
          </ToggleButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default Product;
