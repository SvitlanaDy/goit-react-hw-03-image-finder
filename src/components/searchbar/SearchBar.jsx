
import { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/searchbar/SearchBar.module.css';
class SearchBar extends Component{
    state = {
		value: '',
	}

	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	  };

	handleChange = ({ target: { value } }) => {
		this.setState({ value })
	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.value === '' ) {return}
		this.props.onSubmit(this.state.value);
		this.setState({value:''})

	}
	

    render() {
		return (
			<>
			<header className={css.searchbar}>
				<form
				 className={css.searchForm}
					onSubmit={this.handleSubmit}
				>
					<input
					 className={css.searchFormInput}
						type='search'
						placeholder='Search'
						aria-label='Search'
						onChange={this.handleChange}
						value={this.state.value}
					/>
					<button className='{css.searchFormBtn}' type='submit'>
						Search
					</button>
				</form>
				</header>
			</>
		)
	}
}

export default SearchBar