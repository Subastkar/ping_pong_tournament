class Api::TeamsController < ApplicationController
  layout false
  respond_to :json

  expose(:teams)
  expose(:team)

  def index
    render json: teams
  end

  def show
  end

  def create
    team = Team.new
    team.assign_attributes(name: params["team"]["name"], picture: JSON.parse(params["team"]["picture"].to_json))

    params["team"]["players"].each do |player_attributes|
      team.players.new(player_attributes)
    end

    if team.save
      render json: { message: "The Team was successfully created"}
    else
      render json: { message: "The Team was not created"}
    end
  end

  def destroy
    if team.delete
      render json: { message: "The Team was successfully deleted"}
    end
  end

end
