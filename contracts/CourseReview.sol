// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseReview {
    struct Review {
        uint8 question1Rating; // Rating for course content (1-5)
        uint8 question2Rating; // Rating for professor's teaching (1-5)
        string reviewText;      // Text review
        address studentAddress; // Address of the student
    }

    // Array to store reviews
    Review[] public reviews;

    // Event to emit when a review is submitted
    event ReviewSubmitted(
        uint8 question1Rating,
        uint8 question2Rating,
        string reviewText,
        address studentAddress
    );

    // Function to submit a review
    function storeReview(uint8 _question1Rating, uint8 _question2Rating, string memory _reviewText) public {
        require(_question1Rating >= 1 && _question1Rating <= 5, "Invalid rating for question 1");
        require(_question2Rating >= 1 && _question2Rating <= 5, "Invalid rating for question 2");

        // Create a new review
        Review memory newReview = Review({
            question1Rating: _question1Rating,
            question2Rating: _question2Rating,
            reviewText: _reviewText,
            studentAddress: msg.sender
        });

        // Store the review
        reviews.push(newReview);

        // Emit event
        emit ReviewSubmitted(_question1Rating, _question2Rating, _reviewText, msg.sender);
    }

    // Function to retrieve a review by index
    function getReview(uint256 index) public view returns (Review memory) {
        require(index < reviews.length, "Review does not exist");
        return reviews[index];
    }

    // Function to get the total number of reviews
    function getReviewCount() public view returns (uint256) {
        return reviews.length;
    }
}
