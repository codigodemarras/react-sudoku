import './styels.scss';

interface Props {
  openWinnerModal: boolean;
}

function WinnerModal({ openWinnerModal }: Props) {
  if (!openWinnerModal) {
    return null;
  }

  return (
    <div className="winnerModal">
      <div className="modalBg" />

      <div className="modalContent">
        <h4 className="title">Congratulations!</h4>
        <p className="description">You solved the SUDOKU!</p>
        <p className="description">If you want to play again, restart the game.</p>

        <button
          className="btn"
          onClick={() => {
            window.location.reload();
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default WinnerModal;
