import {Component, createElement} from 'react';



/**
 *	Maps the container's state to props for the wrapped component.
 *
 *	@callback mapStateToPropsCallback
 *	@param {object} state - Container's state.
 *	@param {object} props - Container's props.
 */



/**
 *	Maps the container's state to props for the wrapped component.
 *
 *	@callback mapSetStateToPropsCallback
 *	@param {function} state - A function to update the container's
 *		state. This function has exactly the same API as the
 *		setState() method of React components.
 *	@param {object} props - Container's props.
 */



/**
 *	Maps the container's props to an initial state.
 *
 *	@callback mapPropsToStateCallback
 *	@param {object} props - Container's props.
 */



/**
 *	Returns a function that wraps a component with a state container.
 *
 *	@param {mapStateToPropsCallback} mapStateToProps -
 *		A function that maps the container's state to props
 *		for the wrapped component.
 *	@param {mapSetStateToPropsCallback} mapSetStateToProps -
 *		A function that Maps the container's state to props
 *		for the wrapped component.
 *	@param {object|mapPropsToStateCallback} initialState -
 *		Initial state of the container.
 */
export default function connect(mapStateToProps, mapSetStateToProps, initialState = {}) {
	/**
	 *	Wraps the given component with a state container.
	 *
	 *	@param {function|Component} WrappedComponent -
	 *		The component to wrap.
	 */
	return function wrapWithConnect(WrappedComponent) {
		const name = WrappedComponent.displayName
			|| WrappedComponent.name
			|| 'Component';

		return class StateContainer extends Component {

			static displayName = `${name}StateContainer`;

			constructor(props) {
				super(props);

				this.state = (typeof initialState === 'function')
					? initialState(props)
					: initialState;
			}

			render() {
				const stateProps = mapStateToProps(
					this.state,
					this.props
				);

				const setStateProps = mapSetStateToProps(
					this.setState.bind(this),
					this.props
				);

				return createElement(WrappedComponent, {
					...this.props,
					...stateProps,
					...setStateProps
				});
			}
		};
	};
}
