import React, { PureComponent as Component } from 'react'

const initialState = () => ({
  selection: null,
  geometry: null,
  data: {}
})

const withAnnotationEditor = (key = 'annotation') => DecoratedComponent => {
  class WithAnnotationEditor extends Component {
    state = initialState()

    change = (annotation) => {
      this.setState(annotation)
    }

    changeData = (data) => {
      this.setState({
        data
      })
    }

    clear = () => {
      this.setState(initialState())
    }

    render () {
      const hocProps = {
        [key]: {
          store: this.state,
          change: this.change,
          changeData: this.changeData,
          clear: this.clear
        }
      }

      return (
        <DecoratedComponent
          {...this.props}
          {...hocProps}
        />
      )
    }
  }

  WithAnnotationEditor.displayName = `WithAnnotationEditor(${DecoratedComponent.displayName})`

  return WithAnnotationEditor
}

export default withAnnotationEditor