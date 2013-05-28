require 'spec_helper'

describe Score do
  before(:each) do
    @set = Match.first.match_sets.create
    @score = @set.scores.create(total: 7)
  end

  it "should have a score" do
    @score.total.should == 7
  end

  it "should have a relation with a set " do
    @score.match_set.should_not be_nil
  end

  it "belongs to a team" do
    pending
  end
end
