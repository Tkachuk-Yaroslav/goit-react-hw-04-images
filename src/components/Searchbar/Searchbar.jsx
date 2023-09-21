// import React, { Component } from 'react';
// import '../../index.css';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    // this.setState({ value });
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
};

export default Searchbar;

// export default class Searchbar extends Component {
//   state = {
//     value: '',
//   };

// handleChange = ({ target: { value } }) => {
//   this.setState({ value });
// };

// handleSubmit = e => {
//   e.preventDefault();
//   this.props.onSubmit(this.state.value);
// };

//   render() {
//     return (
//       <>
//         <header className="Searchbar">
//           <form className="SearchForm" onSubmit={this.handleSubmit}>
//             <button type="submit" className="SearchForm-button">
//               <span className="SearchForm-button-label">Search</span>
//             </button>

//             <input
//               className="SearchForm-input"
//               type="text"
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//               value={this.state.value}
//               onChange={this.handleChange}
//             />
//           </form>
//         </header>
//       </>
//     );
//   }
// }
