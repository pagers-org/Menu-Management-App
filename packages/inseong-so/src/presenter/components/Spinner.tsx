import styled from '@emotion/styled';

const StyledSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: #fafafa;

  .spinner:after,
  .spinner:before {
    content: '';
    position: absolute;
    margin: -6px;
    box-sizing: inherit;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    opacity: 1;
    border: inherit;
    border-color: transparent;
    border-top-color: rgba(20, 169, 195, 0.7);
    -webkit-animation: video-react-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite,
      video-react-spinner-fade 1.1s linear infinite;
    animation: video-react-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite,
      video-react-spinner-fade 1.1s linear infinite;
  }

  .spinner {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    opacity: 0.85;
    text-align: left;
    border: 6px solid rgba(20, 169, 195, 0.5);
    box-sizing: border-box;
    background-clip: padding-box;
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .spinner:before,
  .spinner:before {
    border-top-color: #0eb5c6;
  }

  .spinner:after,
  .spinner:after {
    border-top-color: #0eb5c6;
    -webkit-animation-delay: 0.44s;
    animation-delay: 0.44s;
  }

  @keyframes video-react-spinner-spin {
    to {
      transform: rotate(1turn);
    }
  }

  @-webkit-keyframes video-react-spinner-spin {
    to {
      -webkit-transform: rotate(1turn);
    }
  }

  @keyframes video-react-spinner-fade {
    0% {
      border-top-color: #0eb5c6;
    }

    20% {
      border-top-color: #0eb5c6;
    }

    35% {
      border-top-color: #00ffff;
    }

    60% {
      border-top-color: #0eb5c6;
    }

    to {
      border-top-color: #0eb5c6;
    }
  }

  @-webkit-keyframes video-react-spinner-fade {
    0% {
      border-top-color: #0eb5c6;
    }

    20% {
      border-top-color: #0eb5c6;
    }

    35% {
      border-top-color: #00ffff;
    }

    60% {
      border-top-color: #0eb5c6;
    }

    to {
      border-top-color: #0eb5c6;
    }
  }
`;

const Spinner = () => {
  return (
    <StyledSpinner>
      <div className="spinner"></div>
    </StyledSpinner>
  );
};

export default Spinner;
