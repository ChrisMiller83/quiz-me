import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createDeleteResults } from '../redux/actions';

export default function Results() {
  const dispatch = useDispatch();
 
  const results = useSelector((state) => state.results)

  const deleteResults = (index) => {
    dispatch(createDeleteResults(index));
  }

  return (
    <div>
      <h1>Results</h1>
      {results.map((result, index) => {
        
        return (
          <div className="results"> 
          Quiz # {index + 1}           
            <Card className="results-card" xs={12} sm={6} md={4} lg={3}>
              <Card.Title className="cat-label">
                <h6 className="cat-label">Category:</h6>
                {result.category.name}
              </Card.Title>
              <Card.Title className="diff-label">
                <h6 className="diff-label">Difficulty:</h6>
                {result.difficulty.name}
              </Card.Title>              
              <Card.Title className="answers-label">
                <h6 className="answers-label">Correct Answers:</h6>
                {result.answers.length} out of {result.answers.filter((a) => a.isCorrect).length}
              </Card.Title>
              <Button variant="danger" onClick={()=>deleteResults(index)}>X</Button>
            </Card>
          </div>  
        )
      })}
    </div>
  )
}
