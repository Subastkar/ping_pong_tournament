class MatchSet < ActiveRecord::Base
  validates_presence_of :match, :set_number

  has_one :winner, foreign_key: 'team_id', class_name: 'Team'
  has_many :scores

  belongs_to :match
end
