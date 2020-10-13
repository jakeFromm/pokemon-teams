class TrainersController < ApplicationController
  def index
    @trainers = Trainer.all
    render json: @trainers
  end

  # def show
  #   @trainer = Trainer.find(params[:id])
  # end

  # private
  # def trainer_params
  #   params.require(:trainer).permit(:id, :name, :pokemons)
  # end

end
