import { PropTypes } from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';


const ReviewWrapper = styled.div`
  margin-bottom: 1.7em;

  :after {
    content: "";
    display: block;
    clear: both;
  }
`;

const Img = styled.img`
  max-width: 25%;
  hight: 15%;
  margin-right: 0.625em;
  cursor: pointer;
  border: solid 0.1em black;
  border-radius: 1em;
`;

const Review = styled.div`
  width: 55%;
`;

const ReviewHeader = styled.div`
  margin-bottom: 0.625em;
`;

const Reviewer = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: black;
  cursor: pointer;
  line-height: 1.3;
  font-size: 2em;
`;

export const StarRating = styled(StarRatingComponent)`
  line-height: 1.3em;
  font-size: 1.3em;
  vertical-align: top;
  margin-right: 2em;
  margin-left: 1em;
`;

const ReviewFooter = styled.div`
`;

const Likes = styled.a`
  color: black;
  margin-right: 1.1em;
`;

const Buybutton = styled.button`
  font-size: 0.9em;
  color: white;
  padding: 5px 23px;
  border-radius: 3px;
  border: 1px solid white;
  cursor: pointer;
  background-color: black;
  line-height: 1.5;
`;
const Pricebutton = styled.button`
  font-size: 0.9em;
  color: white;
  padding: 5px 23px;
  border-radius: 3px;
  border: 1px solid white;
  cursor: pointer;
  background-color: black;
  line-height: 1.5;
`;

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedStatus: 'like',
      likesCount: props.review.likes_count,
      reviewItem: [],
    };
  }

  like() {
    const { review } = this.props;
    const reviewId = review._id;
    const { likesCount, likedStatus } = this.state;

    const reviewInfos = {
      reviewId,
      likesCount,
      likedStatus,
    };


    this.setState((prevState) => {
      if (prevState.likedStatus === 'like') {
        return {
          likedStatus: 'unlike',
        };
      }
      return {
        likedStatus: 'like',
      };
    });
  }

  handleClick() {
    // eslint-disable-next-line no-alert
    alert('Please fill out the form', this);
  }

  render() {
    const { review } = this.props;
    const { likedStatus } = this.state;
    const { likesCount } = this.state;

    return (
      <ReviewWrapper>
        <Img alt="" src={review.image_url} />
        <Review id={review._id}>
          <ReviewHeader>
            <Reviewer>
              {review.reviewer_name}
            </Reviewer> <br />
            {' Rating '}
            <StarRating name="review_rate" value={review.star_rate} starColor="#f65" emptyStarColor="#ddd" editing={false} />
          </ReviewHeader>
          <ReviewFooter>
            {/* <Likes>
              <span className="likes_count">
                {likesCount}
              </span>
              {' likes'}
            </Likes> */}
            <Buybutton type="submit" onClick={e => this.handleClick(e)}> Buy </Buybutton>
            <Pricebutton> $899.99 </Pricebutton>
            {/* <CardForm> </CardForm> */}
          </ReviewFooter>
        </Review>
      </ReviewWrapper>
    );
  }
}

ReviewComponent.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.number,
    image_url: PropTypes.string,
    star_rate: PropTypes.number,
    likes_count: PropTypes.number,
  }).isRequired,
};

export default ReviewComponent;
