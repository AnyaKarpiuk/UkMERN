import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import CreatePlace from './CreatePlace';
import EditPlace from './EditPlace';
import PlaceList from './PlaceList';
// import FoodList from'./FoodList';
// import CreateFood from './CreateFood';
// import EditFood from './EditFood';

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        <Route exact path="/" component={PlaceList}/>
        <Route path="/edit-place/:id" component={EditPlace}/>
        <Route path="/create-place" component={CreatePlace}/>
        {/* <Route path="/food-list" component={FoodList}/>
        <Route path='/create-food' component={CreateFood}/>
        <Route path='/edit-food/:id' component={EditFood}/> */}
      </div>
    </HashRouter>
  );
};

export default App;
